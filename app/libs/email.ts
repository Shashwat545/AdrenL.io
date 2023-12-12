import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";

const client = new MailtrapClient({ 
  endpoint: "https://send.api.mailtrap.io/",
  token: process.env.MAILTRAP_TOKEN || ''
});

let transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS
    }
});

const sender = {
  email: "noreply@adrenl.io",
  name: "AdrenL",
};

type profile = { 
  name: string;
  email: string;
};

interface EmailOptions {
    profile: profile;
    subject: "verification" | "forget-password" | "password-changed";
    linkUrl?: string;
}

const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
  const recipients = [{ email: profile.email }];
  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "c4799c1e-11e6-46ae-9837-cdfaa9474d69",
    template_variables: {
      subject: "Verify Email Address",
      user_name: profile.name,
      link: linkUrl,
      btn_title: "Verify Email",
      company_name: "Adrenl",
    }
  });
};
  
const sendForgetPasswordLink = async (profile: profile, linkUrl: string) => {
  const recipients = [{ email: profile.email }];
  await client.send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  });
};
  
const sendUpdatePasswordConfirmation = async (profile: profile) => {
  const recipients = [{ email: profile.email }];
  await client.send({
    from: sender,
    to: recipients,
    template_uuid: "eba72c1b-18b1-465d-af1a-913fad2fd2f6",
    template_variables: {
      subject: "Password Reset Successful",
      user_name: profile.name,
      link: process.env.SIGN_IN_URL!,
      btn_title: "Sign in",
      company_name: "Next Ecom",
    }
  });
};
  
export const sendEmail = (options: EmailOptions) => {
  const { profile, subject, linkUrl } = options;
  switch (subject) {
    case "verification":
      return sendEmailVerificationLink(profile, linkUrl!);
    case "forget-password":
      return sendForgetPasswordLink(profile, linkUrl!);
    case "password-changed":
      return sendUpdatePasswordConfirmation(profile);
  }
};
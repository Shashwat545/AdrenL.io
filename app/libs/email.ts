import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";

type profile = { name: string; email: string };

const TOKEN = "f91d6b0a4cc5a25bc8a91df2425e8c66";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4e85a54210935e",
      pass: "8770bc413d337c"
    }
  });

  const sender = {
    email: "noreply@adrenl.io",
    name: "AdrenL",
  };

  interface EmailOptions {
    profile: profile;
    subject: "verification" | "forget-password" | "password-changed";
    linkUrl?: string;
  }

  const sendEmailVerificationLink = async (profile: profile, linkUrl: string) => {
   
      const recipients = [
        {
          email: profile.email,
        }
      ];
    
   console.log(recipients);
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
      }},
    );
  };
  
  const sendForgetPasswordLink = async (profile: profile, linkUrl: string) => {

    const recipients = [
      {
        email: profile.email,
      },
    ];
  
    await client.send({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        text: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
      });
  };
  
  const sendUpdatePasswordConfirmation = async (profile: profile) => {

    const recipients = [
      {
        email: profile.email,
      },
    ];
  
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
      },
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




  
 
  
 

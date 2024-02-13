'use client';

import Container from "../components/Container";

const ComingSoonClient = () => {
  return (
    <Container>
      <div className="bg-gray-50 py-12 lg:py-24 xl:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <img
              alt="Adventure"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:order-last lg:aspect-square"
              height="354"
              src="/images/coming-soon.jpg"
              width="500"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Coming Soon</h1>
                <p className="max-w-[500px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get ready to explore the great outdoors. This section is under development and will be launched soon.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                
                <p className="text-s text-gray-500 dark:text-gray-400">Sign up to our newsletter from the footer to get notified when this section is launched.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ComingSoonClient;
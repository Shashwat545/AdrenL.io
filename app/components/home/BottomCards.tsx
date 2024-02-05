'use client';

import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/app/components/shadcn/CardWhite";
import { Button } from "@/app/components/shadcn/Button";
import Image from 'next/image';

export default function Component() {
  return (
    <div className="flex flex-col align-center justify-center mt-10 md:flex-row gap-4">
      <Card className="w-full md:w-1/2">
        <CardHeader className="bg-black">
          <CardTitle>Adventure Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            alt="Adventure Course"
            className="aspect-video overflow-hidden rounded-xl object-cover object-center"
            height={310}
            width={800}
            src="/images/courses.jpg"
          />
          <p className="mt-4 text-black">
            Our courses are designed to provide you with the best learning experience. From skiing to paragliding, we have it all.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full md:w-auto">Explore Courses</Button>
        </CardFooter>
      </Card>
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
        <Image
            alt="Blog Post"
            className="aspect-video overflow-hidden rounded-xl object-cover object-center"
            height={310}
            width={800}
            src="/images/blog.jpg"
        />
          <p className="mt-4 text-black">
            Our community of adventurers share their experiences and tips in our blog. Get inspired for your next adventure.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full md:w-auto">Read Blogs</Button>
        </CardFooter>
      </Card>
    </div>
  )
}


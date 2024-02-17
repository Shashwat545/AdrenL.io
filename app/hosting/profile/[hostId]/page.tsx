import { CardTitle, Card, CardContent } from "@/app/components/shadcn/Card";
import { Badge } from "@/app/components/shadcn/Badge";
import ListingCard from "@/app/components/listings/ListingCard";
import getListingsByUserId from "@/app/actions/getListingsByUserId";
import getUserById from "@/app/actions/getUserById";
import ReviewComponent from "./ReviewComponent";
import getHostReviews from "@/app/actions/getHostReviews";

interface IParams {
  hostId: string;
}

export default async function Component({ params } : {params: IParams}) {
  const listings = await getListingsByUserId({userId: params.hostId});
  const host = await getUserById({userId: params.hostId});
  const hostReviews = await getHostReviews({hostId: host.id});
  
  return (
    <main className="lg:flex">
      <aside className="lg:w-1/3 space-y-6">
        <div className="flex flex-col justify-center items-center">
          <div className="relative flex flex-col items-center rounded-[20px] w-[600px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
              <img
                src="https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="absolute flex h-32 w-full justify-center rounded-xl bg-cover object-fill"
              />
              <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                <img
                  className="h-full w-full rounded-full"
                  src={host?.image || "/images/placeholder.jpg"}
                  alt=""
                />
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center">
              <h4 className="text-xl font-bold text-navy-700">{host.name}</h4>
              <p className="text-base font-normal text-gray-600">
                Listing Host
              </p>
            </div>
            <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700">17</p>
                <p className="text-sm font-normal text-gray-600">Reviews</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700">✔</p>
                <p className="text-sm font-normal text-gray-600">Verfied</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-navy-700">434</p>
                <p className="text-sm font-normal text-gray-600">
                  No of Reviews
                </p>
              </div>
            </div>
          </div>
        </div>
        <Card className="p-4">
          <CardTitle className="text-lg font-bold">
            Verification Status
          </CardTitle>
          <CardContent>
            <Badge className="mt-2">Verified</Badge>
          </CardContent>
        </Card>
      </aside>
      <section className="lg:w-2/3 overflow-auto space-y-6 py-6 px-4">
        <a
          href="#"
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            Bio
          </h5>
          <p className="font-normal text-gray-700">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </a>

        <Card className="p-4 overflow-x-auto">
          <div className="flex-none hide-scroll-bar">
            <div className="flex flex-col bg-white m-auto p-auto">
              <h1 className="flex py-5 px-4 font-bold text-4xl text-gray-800">
                Reviews
              </h1>
              <div className="flex overflow-x-scroll pb-10 md:hide-scroll-bar">
                <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">

                  
                  { hostReviews?.map((review) => (  
                  <div key={review.id} className="inline-block px-3">
                    <div className="w-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                      <ReviewComponent key={review.id} reviewBody={review.comment ?? ""} userName={review?.user?.name ?? ""} date={review.createdAt} userImage={review.user.image ?? ""} />
                    </div>
                  </div>
                  ))
}

                  <div className="inline-block px-3">
                    <div className="w-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <CardTitle className="text-lg font-bold">Listings</CardTitle>
          <CardContent className="space-y-4">
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {listings?.map((listing) => (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  actionId={listing.id}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

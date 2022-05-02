import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/utils/useUser';
import { useCompany } from '@/utils/CompanyContext';
import { useCampaign } from '@/utils/CampaignContext';
import LoadingDots from '@/components/ui/LoadingDots';
import SEOMeta from '@/components/SEOMeta'; 
import Button from '@/components/ui/Button'; 

export default function InnerDashboardPage() {
  const router = useRouter();
  const { user, userFinderLoaded } = useUser();
  const { activeCompany } = useCompany();
  const { userCampaignDetails } = useCampaign();

  useEffect(() => {
    if(userFinderLoaded){
      if (!user) router.replace('/signin');
    }
  }, [userFinderLoaded, user, activeCompany]);

  return (
    <>
      <SEOMeta title="Campaigns"/>
      <div className="mb-12">
        <div className="pt-10 wrapper flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl tracking-tight font-extrabold">Campaigns</h1>
          <Button
            href={`/dashboard/${router?.query?.companyId}/campaigns/new`}
            medium
            primary
          >
            <span>Create campaign</span>
          </Button>
        </div>
      </div>
      <div className="wrapper">
        {
          activeCompany && userCampaignDetails ?
            userCampaignDetails !== null && userCampaignDetails?.length > 0 ?
              <div>
                <div className="flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow-md rounded-lg border-4 border-gray-300">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-200">
                            <tr className="divide-x-4 divide-gray-300">
                              <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold sm:pl-6">
                                Campaign
                              </th>
                              <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold">
                                Affiliates
                              </th>
                              <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold0">
                                Revenue
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {userCampaignDetails?.map((campaign) => (
                              <tr key={campaign?.campaign_id} className="divide-x-4 divide-gray-200">
                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pl-6">
                                  <p className="text-xl mb-2 font-semibold">{campaign?.campaign_name}</p>
                                  <p className="text-md">{campaign?.commission_type === 'percentage' ? `${campaign?.commission_value}% commission on all paid referrals` : `${activeCompany?.company_currency}${campaign?.commission_value} commission on all paid referrals`}</p>
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm">
                                  <a href="#" className="underline font-semibold">0 affiliates</a>
                                </td>
                                <td className="whitespace-nowrap p-4 text-sm">$0 USD</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            :
              <div>
                <p>You have no campaigns.</p>
              </div>
          :
            <LoadingDots/>
        }
      </div>
    </>
  );
}
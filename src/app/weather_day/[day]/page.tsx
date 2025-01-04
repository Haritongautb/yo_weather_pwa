import { DayWeather } from "@/components";

interface IDayWeatherPageProps {
  day: string;
}

export const dynamic = "force-static";
const DayWeatherPage = async ({
  params,
}: {
  params: Promise<IDayWeatherPageProps>;
}) => {
  const { day } = await params;
  return <DayWeather day={day} />;
};

export default DayWeatherPage;

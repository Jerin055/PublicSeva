import CitizenNavbar from "../../components/CitizenNavbar";
import CitizenLeftPanel from "../../components/CitizenLeftPanel";
import Footer from "../../components/Footer";
import ReportButton from "../../components/ReportButton";

export default function CitizenHome() {
  return (
    <>
      <CitizenNavbar />

      <div className="flex min-h-screen">
        <CitizenLeftPanel />

        <main className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Citizen Home
          </h1>
          <p className="text-gray-600 mt-2">
            Reports feed will come here.
          </p>
        </main>
      </div>

      <ReportButton />

      <Footer />
    </>
  );
}

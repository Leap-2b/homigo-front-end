import EmployeeOrderDashboard from "./_components/Employee-order-dashboard";

export default function EmployeePage() {
  return (
    <main className="min-h-screen w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Ажилтны Хяналтын Самбар
        </h1>
        <EmployeeOrderDashboard />
      </div>
    </main>
  );
}

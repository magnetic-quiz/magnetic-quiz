// components/RightSidebar.tsx
export const RightSidebar = () => {
  return (
    <div className="bg-gray-100 p-4 space-y-4">
      <h2 className="text-lg font-bold">Settings</h2>
      <div className="bg-white p-4 rounded-md shadow-sm">
        {/* Add your settings form here */}
        <p className="text-sm">Select question type, configure layout, etc.</p>
      </div>
    </div>
  );
};

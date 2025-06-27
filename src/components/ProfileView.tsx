interface ProfileViewProps {
  admin: {
    email: string;
    id: string;
    [key: string]: any;
  };
}

export default function ProfileView({ admin }: ProfileViewProps) {
  return (
    <div className="max-w-xl mx-auto bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-white">Your Profile</h2>
      <div className="text-sm text-gray-300 space-y-2">
        <p>
          <span className="text-gray-400">Email:</span> {admin.email}
        </p>
      </div>
    </div>
  );
}

import ChangeEmailCard from '../../../components/card/changeEmailCard';
import ChangePasswordCard from '../../../components/card/changePasswordCard';

export default function AccountSettingsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">Account Settings</h1>
            <ChangeEmailCard />
            <ChangePasswordCard />
        </div>
    );
}

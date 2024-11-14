import UserPage from "@/components/users/UserPage";
import Cookies from 'js-cookie';
export default function UserUI({params}) {

    return (
        <div className="w-screen">
                <UserPage userId={params.userId} />
        </div>
    );
}
import PreferencesCard from "@/components/users/PrefencesCards";
export default function PreferencesUI({params}) {

    return (
        <div className="w-screen">
                <PreferencesCard userId={params.userId} />
        </div>
    );
}
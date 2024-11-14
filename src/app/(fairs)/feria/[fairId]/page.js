import FairView from "@/components/fairs/FairView";

export default function FairPage({params}) {
    return (
        <div className="w-screen">
                <FairView params={params.fairId} />
        </div>
    );
}
import { CheckpointPreparationView } from "@/components/mentors/checkpoint-preparation-view";

export async function generateStaticParams() {
  return [
    { checkpointId: "tl-cp-1" },
    { checkpointId: "tl-cp-2" },
    { checkpointId: "tl-cp-3" },
  ];
}

interface PageProps {
  params: Promise<{ checkpointId: string }>;
}

export default async function CheckpointDetailPage({ params }: PageProps) {
  const { checkpointId } = await params;
  return <CheckpointPreparationView checkpointId={checkpointId} />;
}

type Props = {
  progress: number
}

export default function ProgressBar({
  progress,
}: Props) {
  return (
    <div className="w-full bg-gray-200 h-4 rounded">

      <div
        className="bg-green-500 h-4 rounded"
        style={{ width: `${progress}%` }}
      />

    </div>
  )
}
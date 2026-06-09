type Props = {
  title: string
  level: string
}

export default function LessonCard({
  title,
  level,
}: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h3 className="font-bold text-xl">
        {title}
      </h3>

      <p className="text-gray-500">
        {level}
      </p>

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Open
      </button>

    </div>
  )
}
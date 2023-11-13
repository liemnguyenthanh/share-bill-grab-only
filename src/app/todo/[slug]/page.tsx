import fs from 'fs-extra';
import path from 'path';

type TodoType = {
  userId: string,
  id: number,
  title: string,
  completed: boolean
}

const saveJson = async (data: any) => {
  const filePath = path.resolve('public/data.json');
  await fs.ensureFile(filePath);
  await fs.writeJson(filePath, data);
};

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8080/todos')
    const data: TodoType[] = await response.json()
    await saveJson(data);
    return data;
  } catch (error) {
    return [];
  }
};

export async function generateStaticParams() {
  const todoItems = await fetchData()
  console.log({ todoItems: todoItems.length });

  return todoItems.map((todo) => ({
    slug: todo.id.toString()
  }))
}

const getTodoDetail = async (todoId: number) => {
  const filePath = path.resolve('public/data.json');
  try {
    // Read the JSON file
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data: TodoType[] = JSON.parse(jsonData);

    return data.find(todo => todo.id === todoId)
  } catch (error) {
    return null
  }
}

type Props = {
  params: {
    slug: string
  }
}

export default async function Todo({ params }: Props) {
  const { slug } = params
  const todoDetail = await getTodoDetail(parseFloat(slug))
  console.log({ count: slug });

  return (
    <div className="">
      <div className="">Todo Detail</div>

      <div className="" style={{ marginTop: '20px' }}>
        {todoDetail?.id}
      </div>

      <div className="" style={{ marginTop: '20px' }}>
        {todoDetail?.title}
      </div>

      <div className="" style={{ marginTop: '20px' }}>
        {todoDetail?.userId}
      </div>
    </div>
  )
}

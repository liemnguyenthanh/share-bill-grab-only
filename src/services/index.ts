const API = 'http://localhost:8080/'

export const postFile = async (file: any) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(API + 'upload', {
    method: 'POST',
    body: formData,
  })

  return response.json()
}
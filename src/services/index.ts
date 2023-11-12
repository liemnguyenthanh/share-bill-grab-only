const URL = 'http://localhost:8080'

export const postFile = async (file: any) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('lang', 'vie');

  const response = await fetch(URL + '/api/upload', {
    method: 'POST',
    body: formData,
  })

  return response.json()
}
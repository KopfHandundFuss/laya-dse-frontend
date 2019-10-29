export default function (path = '') {
  return /localhost/.test(location.host)
      ? `http://localhost:3001/api/${path}` : `api/${path}`
}

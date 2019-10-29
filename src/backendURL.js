export default function () {
  return /localhost/.test(location.host)
    ? 'http://localhost:3001/api'
    : 'https://laya.informatik.hu-berlin.de/api'
}

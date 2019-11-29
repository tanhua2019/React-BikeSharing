export const formateDate = (time) => {
  if (!time) return ''
  let date = new Date(time)
  let year = date.getFullYear();
  let month = (date.getMonth()+1);
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();
  function formatTime(m){return m<10?'0'+m:m }
  return year +'-'+ formatTime(month) +'-'+ formatTime(day) +' '+ formatTime(hours) +':'+ formatTime(minutes)+':'+ formatTime(second)
}
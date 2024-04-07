
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getPort = () => {
  return localStorage.getItem('sgav_test_port')
}


export const setPort = (port) => {
  localStorage.setItem('sgav_test_port', port)
}
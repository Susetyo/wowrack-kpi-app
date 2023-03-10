export const getHeader = (jwtToken = "") => {
  let bearer = ""
  if(jwtToken){
    bearer = jwtToken.split("=")[1]
    if(bearer){
      bearer =  bearer.replace(/%20/g, " ")
    }
  }
 
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: bearer,
    }
}

export const  fetchPost = async(url = "", data = {}, jwtToken="") =>  {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: getHeader(jwtToken),
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export const  fetchPostLogin = async(url = "", data = {}) =>  {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}
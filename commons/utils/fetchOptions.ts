export const getHeader = (jwtToken = "") => {
  let bearer = ""
  if(jwtToken){
    if(jwtToken.split("=")[1]){
      bearer = jwtToken.split("=")[1]
      if(bearer) bearer =  bearer.replace(/%20/g, " ")
    }else{
      bearer = jwtToken;
    }
  }
 
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: bearer,
    }
}

export const  fetchPost = async(url = "", data = {}, jwtToken="") =>  {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: getHeader(jwtToken),
    body: JSON.stringify(data),
  });

  return response.json();
}

export const  fetchPostLogin = async(url = "", data = {}) =>  {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
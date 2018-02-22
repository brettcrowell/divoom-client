export const postToDivoom = async (address, action, value = []) => {
  const response = await fetch(address, {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      action,
      value
    })
  });
};
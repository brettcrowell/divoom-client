export const postToDivoom = async (address, device, action, value = []) => {
  const response = await fetch(address, {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      device,
      action,
      value
    })
  });
};
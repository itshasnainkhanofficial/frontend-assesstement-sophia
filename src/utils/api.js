export const simulateApiCall = (data, successMessage) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, data, message: successMessage });
      }, 1000);
    });
  };
  
  
  
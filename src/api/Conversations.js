export const fetchConversations = async (identifier) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/conversations?identifier=${identifier}`, {
          method: 'GET',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        if(!response){
          return null;
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
  };
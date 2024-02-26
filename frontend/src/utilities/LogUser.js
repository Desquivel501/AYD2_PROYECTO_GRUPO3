export function getLogUser() {
    let dataU = null;
    const cachedData = localStorage.getItem('user');
    if (cachedData) {
        dataU = JSON.parse(cachedData);
        dataU = dataU?.data?.user?.user_id;
    }
    return dataU;
}
const logout = document.getElementById('logout')

logout.addEventListener('click', () => {
    fetch('/api/sessions/logout', {
        method: 'GET'
    })
    window.location.replace('/')
})
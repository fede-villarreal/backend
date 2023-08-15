const logout = document.getElementById('logout')

logout.addEventListener('click', () => {
    fetch('/api/sessions/logout', {
        method: 'POST'
    })
    window.location.replace('/')
})
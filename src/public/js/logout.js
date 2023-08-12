const logout = document.getElementById('logout')

logout.addEventListener('click', () => {
    fetch('/api/sessions/logout')
    window.location.replace('/')
})
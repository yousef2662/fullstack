let inSignBtn = document.querySelector('.in-sign')
let inLogBtn = document.querySelector('.in-log')
let signState = document.querySelector('.sign')
let logState = document.querySelector('.login')
let usernameSign = document.querySelector('.sign .username')
let passwordSign = document.querySelector('.sign .password')
let usernameLog = document.querySelector('.login .username')
let passwordLog = document.querySelector('.login .password')
let incorrect = document.querySelector('.auth .incorrect')
let notFound = document.querySelector('.auth .not-found')
let exist = document.querySelector('.auth .exist')
let authorizingLog = document.querySelector('.auth .authorizingLog')
let authorizingSign = document.querySelector('.auth .authorizingSign')
let emailRequiredLog = document.querySelector('.auth .emailReqLog')
let emailRequiredSign = document.querySelector('.auth .emailReqSign')
let passRequiredLog = document.querySelector('.auth .passReqLog')
let passRequiredSign = document.querySelector('.auth .passReqSign')


inSignBtn.addEventListener("click", () => {
  signState.classList.add('inactive')
  logState.classList.remove('inactive')
  inSignBtn.classList.add('inactive')
  inLogBtn.classList.remove('inactive')
  usernameLog.value = ""
  passwordLog.value = ""
  emailRequiredLog.classList.add("inactive")
  passRequiredLog.classList.add("inactive")
  authorizingLog.classList.add("inactive")
  incorrect.classList.add("inactive")
  notFound.classList.add("inactive")
})

inLogBtn.addEventListener("click", () => {
  signState.classList.remove('inactive')
  logState.classList.add('inactive')
  inLogBtn.classList.add('inactive')
  inSignBtn.classList.remove('inactive')
  passwordSign.value = ""
  usernameSign.value = ""
  emailRequiredSign.classList.add("inactive")
  passRequiredSign.classList.add("inactive")
  authorizingSign.classList.add("inactive")
  exist.classList.add("inactive")
})


// api ---------------------------------------------


let logButton = document.querySelector('.log-button')
let signButton = document.querySelector('.sign-button')



logButton.addEventListener('click', async () => {
  const username = usernameLog.value
  const password = passwordLog.value

  passRequiredLog.classList.add("inactive")
  emailRequiredLog.classList.add("inactive")
  incorrect.classList.add("inactive")
  notFound.classList.add("inactive")

  if (!username || username.trim() === "" || !username.includes('@') || !password || password.trim() === "" || password.length < 6) {
    if (!password || password.trim() === "" || password.length < 6) {
      passRequiredLog.classList.remove("inactive")
    } if (!username || username.trim() === "" || !username.includes('@')) {
      emailRequiredLog.classList.remove("inactive")
    }
    return;
  }



  authorizingLog.classList.remove("inactive")
  try {
    const response = await fetch('/auth/log', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      throw new Error('Login failed: ' + response.statusText);
    }
    
    const data = await response.json()
    console.log(data, "100%")
    if (data === "ok") {
      window.location.replace("/dashboard")
      return;
    } if (data === "incorrect") {
      authorizingLog.classList.add("inactive")
      incorrect.classList.remove("inactive")
      notFound.classList.add("inactive")
    } else {
      authorizingLog.classList.add("inactive")
      notFound.classList.remove("inactive")
      incorrect.classList.add("inactive")
    }
  } catch (err) {
    console.log("Error:", err)
  }
})


signButton.addEventListener('click', async () => {
  const username = usernameSign.value
  const password = passwordSign.value

  passRequiredSign.classList.add("inactive")
  emailRequiredSign.classList.add("inactive")
  exist.classList.add("inactive")

  if (!username || username.trim() === "" || !username.includes('@') || !password || password.trim() === "" || password.length < 6) {
    if (!password || password.trim() === "" || password.length < 6) {
      passRequiredSign.classList.remove("inactive")
    } if (!username || username.trim() === "" || !username.includes('@')) {
      emailRequiredSign.classList.remove("inactive")
    }
    return;
  }

  authorizingSign.classList.remove("inactive")
  try {
    const response = await fetch('/auth/sign', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      throw new Error('Sign up failed: ' + response.statusText);
    }

    const data = await response.json()
    console.log(data, "100%")
    if (data === "ok") {
      window.location.replace("/dashboard")
      return;
    } else {
      authorizingSign.classList.add("inactive")
      exist.classList.remove("inactive")
    }
  } catch (err) {
    console.log("Error:", err)
  }
})
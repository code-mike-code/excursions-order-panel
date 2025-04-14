const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

console.log( txt.split(/[\r\n]+/gm) );



(function () {


//  1. Ładowanie wycieczek

const fileInput = document.querySelector('.uploader__input')
const excursionsList = document.querySelector('.excursions')
const orderSubmit = document.querySelector('.order__field-submit')
const summaryList = document.querySelector('.summary')
const totalPriceElement = document.querySelector('.order__total-price-value')

let cart = []

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (!file) {
        console.error('Nie wybrano pliku!')
        return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
        const text = e.target.result
        loadExcursions(text)  
    }
    
    reader.readAsText(file)
})


// Funkcja odpowiedzialna za ładowanie wycieczek

function loadExcursions(text) {
    const lines = text.split(/[\r\n]+/gm)
    const dataLines = lines.slice(0)

    dataLines.forEach(function(line) {
        const values = dividedCSVLine(line)

        if (values.length === 5) {
            const [id, name, description, adultPrice, childPrice] = values
            createExcursionElement(id, name, description, adultPrice, childPrice)
        }
    })
}

// Funkcja do dzielenia pliku/lini CSV po przecinkach

function dividedCSVLine(line) {
    const values = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
        const char = line[i]

        if (char === '"') {
            inQuotes = !inQuotes
        } else if (char === ',' && !inQuotes) {
            values.push(current)
            current = ''
        } else {
            current += char
        }
    }

    values.push(current)
    return values
}


// Funkcja do tworzenia elementu wycieczki

function createExcursionElement(id, name, description, adultPrice, childPrice) {

    const excursionsPrototype = document.querySelector('.excursions__item.excursions__item--prototype')

    const newExcursion = excursionsPrototype.cloneNode(true)
    newExcursion.classList.remove('.excursions__item--prototype')
    newExcursion.style.display = 'block'

    const excursionTitle = newExcursion.querySelector('.excursions__title')
    const excursionDescription = newExcursion.querySelector('.excursions__description')
    const excursionPrice = newExcursion.querySelectorAll('.excursions__price')
    
    const adultPriceValue = parseInt(adultPrice.replace('PLN', '')) || 0
    const childPriceValue = parseInt(childPrice.replace('PLN', '')) || 0

    newExcursion.dataset.adultPrice = adultPriceValue
    newExcursion.dataset.childPrice = childPriceValue
    
    excursionTitle.textContent = name
    excursionDescription.textContent = description
    excursionPrice[0].textContent = adultPrice
    excursionPrice[1].textContent = childPrice
    
    document.querySelector('.excursions').appendChild(newExcursion)
    return newExcursion

}

    
// dodawanie wycieczek do listy zamówionych

excursionsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('excursions__field-input--submit') || e.target.classList.contains('excursions__field-submit-button')) {
        e.preventDefault()

        const excursionElement = e.target.closest('.excursions__item')
        const excursionId = excursionElement.dataset.id
        const excursionName = excursionElement.dataset.name
        const excursionAdultPrice = excursionElement.dataset.adultPrice
        const excursionChildPrice = excursionElement.dataset.childPrice
        const adultInput = excursionElement.querySelector('input[name="adults"]')
        const childInput = excursionElement.querySelector('input[name="children"]')

        const adultNumber = parseInt(adultInput.value) || 0
        const childNumber = parseInt(childInput.value) || 0
         
        if (adultNumber > 0 || childNumber > 0) {
        addToCart(excursionId, excursionName, excursionAdultPrice, excursionChildPrice, adultNumber, childNumber)
        updateSummary()
            adultInput.value = ''
            childInput.value = ''
        } else {
            alert('Podaj poprawną liczbe dzieci i/lub dorosłych')
        }
    }
})

summaryList.addEventListener('click', (e) => {
    if (e.target.classList.contains('summary__btn-remove')) {
        e.preventDefault()

        const summaryItem = e.target.closest('.summary__item')
        const itemId = summaryItem.dataset.id
        removeItemFromCart(itemId)
    }
})

// Funkcja dodająca wycieczke do koszyka

function addToCart(excursionId, excursionName, excursionAdultPrice, excursionChildPrice, adultNumber, childNumber) {
    
    cart.push({
        id: Date.now(),
        excursionId: excursionId,
        excursionName: excursionName,
        excursionAdultPrice: excursionAdultPrice,
        excursionChildPrice: excursionChildPrice,
        adultNumber: adultNumber,
        childNumber: childNumber
    })
}

// Funkcja aktualizująca liste wycieczek

function updateSummary() {
    summaryList.innerHTML = ''
    let totalPrice = 0
  
    cart.forEach(item => {
      const listItem = document.createElement('li')
      listItem.classList.add('summary__item')
      listItem.dataset.id = item.id
  
      const title = document.createElement('h3')
      title.classList.add('summary__title')
  
      const nameSpan = document.createElement('span')
      nameSpan.classList.add('summary__name')
      nameSpan.textContent = item.excursionName;

      const itemTotalPrice = (item.adultNumber * item.excursionAdultPrice) + (item.childNumber * item.excursionChildPrice)
        totalPrice += itemTotalPrice
  
      const priceStrong = document.createElement('strong')
      priceStrong.classList.add('summary__total-price')
      priceStrong.textContent = itemTotalPrice + 'PLN'
  
      const removeLink = document.createElement('a')
      removeLink.classList.add('summary__btn-remove')
      removeLink.href = '#'
      removeLink.title = 'usuń'
      removeLink.textContent = 'X'
      removeLink.addEventListener('click', (e) => {
        e.preventDefault()
        removeItemFromCart(item.id)
      })
  
      const pricesParagraph = document.createElement('p')
      pricesParagraph.classList.add('summary__prices')

      let priceText = []
      if (item.adultNumber > 0) {
        priceText.push(`dorośli: ${item.adultNumber} x ${item.excursionAdultPrice}PLN`)
      }
      if (item.childNumber > 0) {
        priceText.push(`dzieci: ${item.childNumber} x ${item.excursionChildPrice}PLN`)
      }
      pricesParagraph.textContent = priceText.join(', ')

      title.appendChild(nameSpan)
      title.appendChild(priceStrong)
      title.appendChild(removeLink)
  
      listItem.appendChild(title)
      listItem.appendChild(pricesParagraph)
      summaryList.appendChild(listItem)
    })
  
    totalPriceElement.textContent = totalPrice + 'PLN'
}

  // Funkcja usuwająca wycieczke z koszyka

function removeItemFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId)
        updateSummary()
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.order__error')
    errorElements.forEach(error => {
        error.remove()
    })
}

orderSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    clearErrorMessages()

    const fullName = document.querySelector('.order__field-input[name="name"]')
    const emailInput = document.querySelector('.order__field-input[name="email"]')

    const nameValue = fullName.value
    const emailValue = emailInput.value

    const errorsContainer = []
    
    if(nameValue.length === 0) {
        errorsContainer.push('Imię i nazwisko jest wymagane.')
    }
    if (emailValue.length === 0) {
        errorsContainer.push('Email jest wymagany.')
    } else if (emailValue.length > 0 && !emailValue.includes('@')) {
        errorsContainer.push('Niepoprawny format Email.')
    }
    if(cart.length === 0) {
        errorsContainer.push('Brak wycieczek w koszyku.')
    }
    if (errorsContainer.length > 0) {
        errorsContainer.forEach(error => {
            const errorElement = document.createElement('p')
            errorElement.classList.add('order__error')
            errorElement.textContent = error
            errorElement.style.color = 'red'
            document.querySelector('.order').appendChild(errorElement)
        })
        return
    }

    if(errorsContainer.length === 0) {
        alert('Formularz wysłany poprawnie.')
    }
    
    cart = []
    updateSummary()
    fullName.value = ''
    emailInput.value = ''
})
})()


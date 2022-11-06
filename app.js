//ID, name, img_path
let dataChampions = [
  [0, 'Anarki', '/QcAvatras/anarki.jpg'],
  [1, 'Blazkowicz', '/QcAvatras/BJ-thumbs.png'],
  [2, 'Athena', '/QcAvatras/QC-Athena-684x380-03__002_.jpg'],
  [3, 'Vizor', '/QcAvatras/vizor.jpg'],
  [4, 'GALENA', '/QcAvatras/galena.jpg'],
  [5, 'Sorlag', '/QcAvatras/sorlag.jpg'],
  [6, 'Slash', '/QcAvatras/slash.png'],
  [7, 'clutch', '/QcAvatras/clutch.jpg'],
  [8, 'death knight', '/QcAvatras/QC-DeathKnight-684x380-03.jpg'],
  [9, 'Doom', '/QcAvatras/Doom-thumbs.jpg'],
  [10, 'Eisen', '/QcAvatras/QC-Eisen-684x380-01.jpg'],
  [11, 'Keel', '/QcAvatras/keel-thumb.jpg'],
  [12, 'Nyx', '/QcAvatras/nyx-thumb.jpg'],
  [13, 'Ranger', '/QcAvatras/ranger-thumb.jpg'],
  [14, 'ScaleBearer', '/QcAvatras/scalebearer-thumb.jpg'],
  [15, 'Strogg', '/QcAvatras/STROGG_thumbnail.jpg'],
]
let openCard = false //Переменная открыто ли уже одна карточка
let currentCardOpen = -1 // Текущая открытая карта
let lastOpenChampion = -1 //  Крайняя открытая карта
let eventLoopBlock = false // Переменая блокировки пока окошкол закрывается
let currentChamps = [] // [-1, -1,... -1] //ОЗУ тут хранятся текущие ID чемпионов
let setChamps = [] //ПЗУ тут хранятся выбранные ID чемпионов/ Используется для сравнения
let counts = 0
document.getElementById('count').innerHTML = counts
for (let arcl = 0; arcl < 32; arcl++) {
  currentChamps.push(-1)
  setChamps.push(-1)
}

//Функция создания первоначальной разметки
function createQCcards() {
  let findIdCard = document.querySelector('.choice_place')
  let divString = ''
  for (let i = 0; i < 32; i++) {
    divString = divString.concat(`
    <div class="champion_card" id="card_${i}" data-type="lock">
      <div class="imgChamp">
        <img src="/QcAvatras/QClogo.jpeg" />
      </div>
      <div class="imgChampHoverLogo">
      <img src="/QcAvatras/QClogo.jpeg" />
      </div>
    </div>
      `)
  }

  findIdCard.innerHTML = divString
}
createQCcards() //генерируем дерево html
const colums = document.querySelectorAll('.champion_card') //Находим карточки

//Отслеживает нажатий клавиатуры
document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    //Если нажали проблел то сбросить переменные
    window.location.reload()
    // openCard = false
    // currentCardOpen = -1
    // lastOpenChampion = -1
    // // currentChamps и setChamps обнулить * 0 и *-1
    // setRandomsChampions() //вызываем функцию замены чемпиона
  }
})

// Блокировка персожана
// По клику нужно убрать прозрачность. добавить ID в setChamps в соотвествующий []
document.addEventListener('click', (event) => {
  if (event.target.parentNode.className == 'imgChampHoverLogo') {
    selectClickedChampion(event.target.parentNode.parentNode.id) //Шелкнули прямо на картинку
  } else if (event.target.parentNode.className == 'champion_card') {
    selectClickedChampion(event.target.parentNode.id) //Шелкнули на поле карточки
  }
})

//Функция выбора героя по id карточки
function selectClickedChampion(nodeId) {
  let iD = nodeId.replace('card_', '') //Определяем № какой карточки открыт
  if (currentCardOpen !== iD && !eventLoopBlock) {
    //обработка повтоного нажатия карточки и блокировки открытия двух карточек
    currentCardOpen = iD
    if (openCard == false) {
      openCard = true //Регистрируем открытие карточки
      const findIdCard = document.querySelector('#card_' + iD)
      findIdCard.querySelector('.imgChamp').style.display = 'block'
      lastOpenChampion = iD //Присваиваем № ячейки для последующего закрытия
    } else {
      const findIdCard = document.querySelector('#card_' + iD)
      findIdCard.querySelector('.imgChamp').style.display = 'block'
      counts++

      if (currentChamps[lastOpenChampion] == currentChamps[iD]) {
        ///Здесь можно стиль изменить заблокированых карточек
        console.log('Блокируем обе карточки в открытом положении')
        openCard = false //Регистрируем закрытие карточки карточки
      } else {
        console.log(
          'Ждем 1 секунду и закрываем обе карточки если они не совпали'
        )
        eventLoopBlock = true
        setTimeout(() => {
          //Закрываем текущую карточку
          findIdCard.querySelector('.imgChamp').style.display = 'none'
          //Закрываем предыдущую
          const findIdCardLO = document.querySelector(
            '#card_' + lastOpenChampion
          )
          findIdCardLO.querySelector('.imgChamp').style.display = 'none'
          openCard = false //Регистрируем закрытие карточки карточки
          eventLoopBlock = false
        }, 1000)
      }
      document.getElementById('count').innerHTML = counts
    }

    //console.log(findIdCard)
    //console.log('там чемпион с ID', currentChamps[iD])

    // if (setChamps[iD] === -1) {
    //   setChamps[iD] = currentChamps[iD] //по классу 0 1 2 присваиваем выбор героя
    //   adddelAnimationSelect(nodeId, true)
    // } else {
    //   setChamps[iD] = -1
    //   adddelAnimationSelect(nodeId, false)
    // }
  }
}

//Функция анимирования выбора чемпиона
// function adddelAnimationSelect(nodein, selONF) {
//   // Надо найти элемент в дом дереве с таким классом
//   const findIdCard = document.querySelector('#' + nodein) //найти чилдрен  imgChamp и изменить ему прозрачность
//   if (selONF == true) {
//     findIdCard.querySelector('.imgChamp').style.opacity = '1'
//     findIdCard.querySelector('.championName').style.color = 'blue'
//     findIdCard.querySelector('.championName').style.textShadow =
//       '4px 3px 0px #7A7A7A, 0px 9px 15px rgba(16,0,206,0.77);'
//   } else {
//     findIdCard.querySelector('.imgChamp').style.opacity = '0.7'

//     findIdCard.querySelector('.championName').style.color = 'crimson'
//     findIdCard.querySelector('.championName').style.textShadow = ''
//   }
// }

//Функция генерации № чемпиона
function generateRndChampion() {
  let rndvalue = Math.floor(Math.random() * dataChampions.length)
  //нужно разрешить использовать персонажа дважды
  ///filter() возвращает массив только созначениями поиска, а .length говорит о количестве
  if (currentChamps.filter((i) => i == rndvalue).length > 1) {
    rndvalue = generateRndChampion() //С помощью рекурсии добиваемся работы без повторов
  }
  return rndvalue
}

//Установка сгенерированных чемпионов
function setRandomsChampions() {
  //currentChamps = [-1, -1, -1] // выполняем сброс текущих
  //Далее надо заменить элементы массива что в массиве выбранных(setChamps) != -1
  setChamps.forEach((setCmp, index) => {
    if (setCmp != currentChamps[index]) currentChamps[index] = setCmp
  })

  colums.forEach((col, index) => {
    //const lable = col.querySelector('.championName') // Находим место под имя
    const champImage = col.querySelector('.imgChamp')

    //Если ячейка блокирована на запись то пропустить шаг
    if (setChamps[index] != -1) {
      return
    }

    const championId = generateRndChampion() //генерируем № чемпиона

    currentChamps[index] = championId //Вписываем id
    //lable.textContent = dataChampions[championId][1] //вписываем в лейбл  championName
    champImage.children[0].src = dataChampions[championId][2]
  })
}

setRandomsChampions() //вызываем функцию создания рандомной карты

import { Section } from "./models/section.interface";

export const personalDataContent: Section[] = [
  {
    title: "Обработка персональных данных",
    paragraphs: [
      {
        key: '1',
        p:  `Общие положения Настоящая Политика обработки персональных данных
          (далее — "Политика") разработана в соответствии с Федеральным законом РФ "О персональных данных"
          №152-ФЗ и определяет порядок обработки и защиты персональных данных пользователей нашего сайта.`,
        bullits: []

      },
      {
        key: '2',
        p: `Цели обработки персональных данных Персональные данные пользователей обрабатываются
          исключительно в следующих целях:`,
        bullits: [
          "Предоставление доступа к услугам и информации на сайте;",
          "Обратная связь с пользователями;",
          "Оформление заявок и заказов;",
          "Исполнение требований законодательства РФ."
        ]
      },
      {
        key: '3',
        p: `Состав обрабатываемых персональных данных Мы обрабатываем только те
          персональные данные, которые предоставляются пользователем добровольно:`,
        bullits: [
          "Фамилия, имя, отчество;",
          "Адрес электронной почты;",
          "Номер телефона."
        ]
      },
      {
        key: '4',
        p: `Правовые основания обработки данных Обработка персональных данных
          осуществляется на следующих правовых основаниях:`,
        bullits: [
          "Согласие субъекта персональных данных;",
          "Выполнение договора с пользователем;",
          "Соблюдение требований законодательства."
        ]
      },
      {
        key: '5',
        p: `Хранение и защита персональных данных Мы принимаем необходимые меры для защиты персональных данных от
          несанкционированного доступа, изменения, уничтожения и распространения.
          Данные хранятся не дольше, чем требуется для целей их обработки, если иное не предусмотрено законодательством.`,
        bullits: []
      },
      {
        key: '6',
        p: `Передача персональных данных третьим лицам Передача персональных данных третьим
          лицам возможна только в случаях:`,
        bullits: [
          "Предоставления отчетности в контролирующие органы в рамках законодательства РФ;",
          "Выполнения договора с пользователем;",
          "Согласия субъекта персональных данных на передачу информации."
        ]
      },
      {
        key: '7',
        p: `Права пользователя Пользователь имеет право:`,
        bullits: [
          "Получать информацию о своих персональных данных и целях их обработки;",
          "Требовать исправления или удаления данных;",
          "Отзывать свое согласие на обработку данных;",
          "Подавать жалобы в надзорные органы."
        ]
      },
      {
        key: '8',
        p: `Изменения в Политике обработки персональных данных Мы оставляем за собой
          право вносить изменения в Политику. Новая редакция вступает в силу с момента ее публикации на сайте.`,
        bullits: []
      },
    ],
  }
]

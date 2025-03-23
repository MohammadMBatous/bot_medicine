import { Telegraf, Markup } from "telegraf";
import { token } from "../config/config.js";
import contactitems from "./data/data_contact.js";
export const bot = new Telegraf(token);
export let city = "";
export let page = 0;
export let selectservices = "";
const keyboard_inline = Markup.inlineKeyboard([
  [Markup.button.callback("عرض وسائل التواصل الرسمية", "view")],
]);
const keyboard_main = [
  [{ text: "محافظة ادلب" }, { text: "محافظة دمشق" }],
  [{ text: "محافظة حماة" }, { text: "محافظة حمص" }],
  [{ text: "محافظة اللاذقية" }, { text: "محافظة درعا" }],
  [{ text: "محافظة حلب" }, { text: "محافظة طرطوس" }],
  [{ text: "🌐 الموقع الإلكتروني 🌐" }],
];

bot.start((ctx) => {
  ctx.reply(
    "مرحبا بك في بوت الإستعلامات الخاص بالخدمات الطبية " +
      " @" +
      `${ctx.chat.username}` +
      " \nيمكنك الوصول إلى بيانات التواصل مع الإدارة عبر الأزرار في الأسفل بعد إختيار المنطقة",
    {
      reply_markup: {
        keyboard: keyboard_main,
        resize_keyboard: true,
      },
      keyboard_inline,
    }
  );
});

bot.hears(
  [
    "محافظة ادلب",
    "محافظة دمشق",
    "محافظة حمص",
    "محافظة حماة",
    "محافظة درعا",
    "محافظة اللاذقية",
    "محافظة طرطوس",
    "محافظة حلب",
  ],
  (ctx) => {
    city = ctx.message.text;
    page = 1;
    ctx.reply("اختر الجهة التي تريد التواصل معها ؟", {
      reply_markup: {
        keyboard: [
          [{ text: "المدير" }, { text: "الدعم والتنسيق" }],
          [{ text: "الشؤون المالية والإدارية" }],
          [{ text: "عودة" }],
        ],
        resize_keyboard: true,
      },
    });
  }
);

bot.hears("المدير", (ctx) => {
  page = 2;
  ctx.reply(`*المدير - ${city}*`);
  ctx.reply(
    `${ctx.message.text}\nمن فضلك اختر طريقة التواصل عبر الازرار في الأسفل`,
    {
      reply_markup: {
        keyboard: [[{ text: "مدير المكتب" }], [{ text: "عودة" }]],
        resize_keyboard: true,
      },
    }
  );
});

bot.hears("الدعم والتنسيق", (ctx) => {
  page = 2;
  ctx.reply(`*الدعم والتنسيق - ${city}*`);
  ctx.reply(
    `${ctx.message.text}\nمن فضلك اختر طريقة التواصل عبر الازرار في الأسفل`,
    {
      reply_markup: {
        keyboard: [
          [{ text: "مسؤول المكتب" }, { text: "المتابع الطبي" }],
          [{ text: "الإسعاف" }],
          [{ text: "عودة" }],
        ],
        resize_keyboard: true,
      },
    }
  );
});
bot.hears("الشؤون المالية والإدارية", (ctx) => {
  page = 2;
  ctx.reply(`*الشؤون المالية والإدارية - ${city}*`);
  ctx.reply("من فضلك اختر الجهة التي تريد التواصل معها عبر الازرار في الأسفل", {
    reply_markup: {
      keyboard: [
        [{ text: "الموارد البشرية" }, { text: "اللوجستي" }],
        [{ text: "المالي" }, { text: "الإداري" }],
        [{ text: "عودة" }],
      ],
      resize_keyboard: true,
    },
  });
});

bot.hears("🌐 الموقع الإلكتروني 🌐", (ctx) => {
  ctx.reply("انتظرونا قريباً جداً خلال أيام قليلة ان شاء الله 🔥");
});

// init
bot.hears(["الموارد البشرية", "اللوجستي", "الإداري", "المالي"], (ctx) => {
  page = 2;
  ctx.reply(
    `${ctx.message.text}\nمن فضلك اختر طريقة التواصل عبر الازرار في الأسفل -`,
    Markup.inlineKeyboard([
      [
        Markup.button.url(
          "🟢 واتساب",
          `https://api.whatsapp.com/send?phone=${
            contactitems[city]["الشؤون المالية والإدارية"][ctx.message.text][
              "num"
            ]
          }`
        ),
        Markup.button.url(
          "🔵 تلغرام",
          `https://t.me/${
            contactitems[city]["الشؤون المالية والإدارية"][ctx.message.text][
              "telegram"
            ]
          }`
        ),
        Markup.button.url(
          "📞 إتصال",
          `https://mohammadmbatous.github.io/telphone/?${
            contactitems[city]["الشؤون المالية والإدارية"][ctx.message.text][
              "num"
            ]
          }`
        ),
      ],
    ])
  );
});

bot.hears(["الإسعاف", "المتابع الطبي", "مسؤول المكتب"], (ctx) => {
  page = 2;
  ctx.reply(
    `${ctx.message.text}\nمن فضلك اختر طريقة التواصل عبر الأزرار في الأسفل`,
    Markup.inlineKeyboard([
      [
        Markup.button.url(
          "🟢 واتساب",
          `https://api.whatsapp.com/send?phone=${
            contactitems[city]["الدعم والتنسيق"][ctx.message.text]["num"]
          }`
        ),
        Markup.button.url(
          "🔵 تلغرام",
          `https://t.me/${
            contactitems[city]["الدعم والتنسيق"][ctx.message.text]["telegram"]
          }`
        ),
        Markup.button.url(
          "📞 إتصال",
          `https://mohammadmbatous.github.io/telphone/?${
            contactitems[city]["الدعم والتنسيق"][ctx.message.text]["num"]
          }`
        ),
      ],
    ])
  );
});

bot.hears(["مدير المكتب"], (ctx) => {
  page = 2;
  ctx.reply(
    `${ctx.message.text}\nمن فضلك اختر طريقة التواصل عبر الأزرار في الأسفل`,
    Markup.inlineKeyboard([
      [
        Markup.button.url(
          "🟢 واتساب",
          `https://api.whatsapp.com/send?phone=${
            contactitems[city]["المدير"][ctx.message.text]["num"]
          }`
        ),
        Markup.button.url(
          "🔵 تلغرام",
          `https://t.me/${
            contactitems[city]["المدير"][ctx.message.text]["telegram"]
          }`
        ),
        Markup.button.url(
          "📞 إتصال",
          `https://mohammadmbatous.github.io/telphone/?${
            contactitems[city]["المدير"][ctx.message.text]["num"]
          }`
        ),
      ],
    ])
  );
});

// back
bot.hears("عودة", (ctx) => {
  switch (page) {
    case 1:
      page = 0;
      ctx.reply("اختر المنطقة التي تريد عرض معلومات التواصل الخاصة بها", {
        reply_markup: {
          keyboard: keyboard_main,
          resize_keyboard: true,
        },
      });
      break;
    case 2:
      page = 1;
      ctx.reply("اختر الجهة التي تريد التواصل معها ؟", {
        reply_markup: {
          keyboard: [
            [{ text: "المدير" }, { text: "الدعم والتنسيق" }],
            [{ text: "الشؤون المالية والإدارية" }],
            [{ text: "عودة" }],
          ],
          resize_keyboard: true,
        },
      });
      break;
    default:
      ctx.reply("اختر المنطقة التي تريد عرض معلومات التواصل الخاصة بها", {
        reply_markup: {
          keyboard: keyboard_main,
          resize_keyboard: true,
        },
      });
      break;
  }
});

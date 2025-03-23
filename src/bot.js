import { Telegraf, Markup } from "telegraf";
import { token } from "../config/config.js";
import contactitems from "./data/data_contact.js";
import Storage from "node-persist";
export const bot = new Telegraf(token);

// varaible for storage
// export let city = "" ?? "محافظة ادلب";
// export let page = 0;
let city = '';
(async () => {
  await Storage.init();
  // await Storage.setItem('city','');
  // await Storage.setItem('page',0); 
})();

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
 async (ctx) =>  {
    await Storage.setItem('city', ctx.message.text);
    await Storage.setItem('page', 1);
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

bot.hears("المدير", async (ctx) => {
   city = await Storage.getItem('city');
  await Storage.setItem('page', 2);
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

bot.hears("الدعم والتنسيق",async (ctx) => {
  city = await Storage.getItem('city');
  await Storage.setItem('page', 2);
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
bot.hears("الشؤون المالية والإدارية", async (ctx) => {
  await Storage.setItem('page', 2);
  city = await Storage.getItem('city');

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
bot.hears(["الموارد البشرية", "اللوجستي", "الإداري", "المالي"],async (ctx) => {
  await Storage.setItem('page', 2);
  city = await Storage.getItem('city');

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

bot.hears(["الإسعاف", "المتابع الطبي", "مسؤول المكتب"], async (ctx) => {
  await Storage.setItem('page', 2);
  city = await Storage.getItem('city');

    // console.log(contactitems[city]["الدعم والتنسيق"]);
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

bot.hears(["مدير المكتب"],async (ctx) => {
  city = await Storage.getItem('city');
  await Storage.setItem('page', 2);
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
bot.hears("عودة",async (ctx) => {
  const countpage = await Storage.getItem('page');
  switch (countpage) {
    case 1:
      await Storage.setItem('page', 0);
      ctx.reply("اختر المنطقة التي تريد عرض معلومات التواصل الخاصة بها", {
        reply_markup: {
          keyboard: keyboard_main,
          resize_keyboard: true,
        },
      });
      break;
    case 2:
      await Storage.setItem('page', 1);
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

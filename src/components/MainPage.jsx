import React from 'react'
import s from './Main.module.css'
import { Collapse } from 'antd'
import CarSelect from './CarSelect';
import { motion } from 'framer-motion';
const items = [
    {
        key: '1',
        label: 'Можно ли сделать растаможку самостоятельно?',
        children: <div className={s.collapse__title}>
            Да, растаможиваете автомобиль вы самостоятельно. Калькулятор рассчитывает оплату за автомобиль + налог (за бензиновый/дизельный авто) + оформление и постановку на учёт в Китае + страховку и логистику до нужного вам таможенного терминала, где вы проверяете автомобиль на целостность и принимаете его. Далее вы сами растаможиваете автомобиль на терминале
        </div>,
    },
    {
        key: '2',
        label: 'Можно ли заказать автомобиль из Китая, которого нет на сайте?',
        children: <div className={s.collapse__title}>Да, можем доставить любой новый автомобиль под ключ из Китая. Свяжитесь с нами в вотсап или телеграм</div>,

    },
    {
        key: '3',
        label: 'Можно ли оплатить автомобиль наличными?',
        children: <div className={s.collapse__title}>Если захотите передать деньги наличными, то это можно сделать в Бишкеке. За операции с наличными сумма вырастет на 3% от всех банковских переводов в Китай</div>,

    },
    {
        key: '4',
        label: 'Сколько дней занимает перевод в Китай?',
        children: <div className={s.collapse__title}>Срок транзакции от 1 до 10 рабочих дней, в зависимости от вашего банка. Как правило, приходит в течение 3-4-х рабочих дней</div>,

    },
];
const variants = {
    visible: i => ({
      opacity: 1, 
      x:0,
      transition: {
        delay: i * 0.2,
      },
    }),
    hidden: { opacity: 0,x:-100, },
  }
const MainPage = () => { 

    return (
        <>
            <div className={s.main}>
                <div className={s.main__container}>

                    <motion.section className={s.main__text}>
                        <motion.div variants={variants} initial={'hidden'} animate={'visible'} custom={0} className={s.main__title}>Новые автомобили из Китая в Алматы или Бишкек за 2 недели</motion.div>
                        <motion.div variants={variants} initial={'hidden'} animate={'visible'} custom={1} className={s.main__subtitle}>Закажите по цене завода, без наценок и переплат. Попробуйте быстрый расчёт цены под ключ</motion.div>
                    </motion.section> 

                    <CarSelect />

                    <section className={s.questions}> 
                    <motion.div variants={variants} initial={'hidden'} whileInView={'visible'} viewport={{once:true,amount:0.2}} custom={0} className={s.questions__title}>Вопросы и ответы</motion.div> 
                    <div className={s.questions__container}> 
                    <Collapse  
                        className={s.questions__collapse}
                        bordered={false} 
                        accordion
                        items={items}
                        />
                    </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default MainPage
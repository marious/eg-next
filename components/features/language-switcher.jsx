import { useState } from 'react';
import ALink from '~/components/features/alink';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

export default function LanguageSwitcher() {
    const { t } = useTranslation();
    const router = useRouter();
    const options = [
        { name: 'English', value: 'en' },
        { name: 'Arabic', value: 'ar' },
    ];
    const { asPath, locale } = router;
    console.log('locale is ', locale);
    // const currentSelectedItem = locale
    //     ? options.find(function (o) {
    //           return o.value === locale;
    //       })
    //     : options[2];
    const [selectedItem, setSelectedItem] = useState(locale);

    function handleItemClick(value) {
        setSelectedItem(value);
        router.push(asPath, undefined, {
            locale: value,
        });
    }

    return (
        <div>
            {/* {selectedItem.value == 'en' && ( */}
            <a
                onClick={e => {
                    e.preventDefault();
                    const switchLang = locale == 'ar' ? 'en' : 'ar';
                    handleItemClick(switchLang);
                }}
            >
                {locale == 'ar' ? 'English' : 'العربية'}
            </a>
            {/* )} */}
            {/* {selectedItem.value == 'ar' && (
                <a
                    onClick={e => {
                        e.preventDefault();
                        handleItemClick('en');
                    }}
                >
                    English
                </a>
            )} */}
        </div>
        // <div className="header-dropdown">
        //     <div className="header-menu">
        //         <ul>
        //             {options.map(option => (
        //                 <li
        //                     key={option.value}
        //                     onClick={e => {
        //                         e.preventDefault();
        //                         handleItemClick(option);
        //                     }}
        //                 >
        //                     <ALink href="#">{option.name}</ALink>
        //                 </li>
        //             ))}
        //         </ul>
        //     </div>
        // </div>
    );
}

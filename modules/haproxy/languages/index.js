exports.ru = {
    menu: {
        id: 'haproxy',
        name: 'HAProxy',
        icon: 'fa-share-alt',
        subs: [
            {id: 'hap-configs-sub', url: '/haproxy/configs', name: 'Конф. файлы'},
            {id: 'hap-settings-sub', url: '/haproxy/settings', name: 'Настройки'}
        ]
    },
    
    configs: {
        title: 'HAProxy конф. файлы',
        pageTitle: 'Список конфигурационных файлов',

        table: {
            name: 'Список'
        },

        hint: {
            name: 'Подсказка',
            swap: 'Вы можете менять блоки друг с другом местами. Для это необходимо захватить блок мышкой и потянуть на нужную позицию.',
            settings: 'Блоки с типом listen, frontend, backend могут иметь дополнительные данные, которые можно создать во вкладке HAProxy -> Настройки.\nДанные хранятся в конфиг файле с помощью комментария перед блоком. В данных можно хранить полезную информацию о наименовании блока, чтобы было удобно читать конфиг.'
        },

        groupConfig: 'Конфиг группы',
        agentConfig: 'Конфиг на сервере',

        slideUp: 'Свернуть',
        slideDown: 'Развернуть',
        insertTemplate: 'Вставить шаблон',

        configName: 'Наименование',
        addBlock: 'Добавить блок',

        emptyBlock: 'Для одного из блоков отсутствует наименование или отсутствует содержимое контента.',

        modal: {
            title: 'Создать новый конфигурационный файл',
            fields: {
                name: 'Наименование',
                type: 'Тип',
                content: 'Содержимое',
                target: 'Цель'

            }
        },

        importModal: {
            title: 'Импортирование конфигурационного файла',
            importBtn: 'Импорт',
            fields: {
                file: 'Файл'
            }
        }
    },

    overview: {
        title: 'Редактирование конфига',
        pageTitle: 'Редактирование конфига',

        slideUp: 'Свернуть',
        slideDown: 'Развернуть',
        insertTemplate: 'Вставить шаблон',
        
        configName: 'Наименование',
        addBlock: 'Добавить блок',

        emptyBlock: 'Для одного из блоков отсутствует наименование или отсутствует содержимое контента.',

        actions: {
            pause: 'Выключить',
            resume: 'Включить'
        }
    },

    settings: {
        title: 'Настройки HAProxy',
        pageTitle: 'Список настроек',

        table: {
            name: 'Список пользовательских полей',
            columns: {
                name: 'Наименование',
                desc: 'Описание'
            }
        },

        modal: {
            title: 'Создать новое поле',
            fields: {
                name: 'Наименование',
                desc: 'Описание'
            }
        },

        editModal: {
            title: 'Редактирование поля'
        }
    },

    ajax: {
        delete: {
            ok: ' успешно удалено'
        }
    }
};

exports.us = {
    menu: {
        id: 'haproxy',
        name: 'HAProxy',
        icon: 'fa-share-alt',
        subs: [
            {id: 'hap-configs-sub', url: '/haproxy/configs', name: 'Configs'},
            {id: 'hap-settings-sub', url: '/haproxy/settings', name: 'Settings'}
        ]
    },
    
    configs: {
        title: 'HAProxy config. files',
        pageTitle: 'List of config files',

        table: {
            name: 'List'
        },

        hint: {
            name: 'Hint',
            swap: 'You can change the blocks with each other in some places. For this you need to to capture the the block with the mouse and drag to the desired position.',
            settings: 'Blocks of type listen, frontend, backend may have additional data that can be created in HAProxy tab -> Settings. \nThe data is stored in a configuration file with a comment to the block. The data you can store useful information about the name of the block to make it easy to read configuration.'
        },

        groupConfig: 'Config of group',
        agentConfig: 'Config for server',

        slideUp: 'Slide up',
        slideDown: 'Slide down',
        insertTemplate: 'Insert template',

        configName: 'Name',
        addBlock: 'Add a block',

        emptyBlock: 'For one of the blocks is no name or not the contents of the content.',

        modal: {
            title: 'Create a new config file',
            fields: {
                name: 'Name',
                type: 'Type',
                content: 'Content',
                target: 'Target'
            }
        },

        importModal: {
            title: 'Import a configuration file',
            importBtn: 'Import',
            fields: {
                file: 'File'
            }
        }
    },

    overview: {
        title: 'Edit config',
        pageTitle: 'Edit config',

        slideUp: 'Slide up',
        slideDown: 'Slide down',
        insertTemplate: 'Insert template',
        
        configName: 'Name',
        addBlock: 'Add a block',

        emptyBlock: 'For one of the blocks is no name or not the contents of the content.',

        actions: {
            pause: 'Turn off',
            resume: 'Turn on'
        }
    },

    settings: {
        title: 'HAProxy settings',
        pageTitle: 'List of settings',

        table: {
            name: 'List of custom fields',
            columns: {
                name: 'Name',
                desc: 'Description'
            }
        },

        modal: {
            title: 'Create a new field',
            fields: {
                name: 'Name',
                desc: 'Description'
            }
        },

        editModal: {
            title: 'Edit field'
        }
    },

    ajax: {
        delete: {
            ok: ' successfully removed'
        }
    }
};
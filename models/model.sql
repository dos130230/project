
insert into users (
    fullname,
    username,
    password,
    avatar_img
    ) 
values
    ('Dostonbek Uktamov','@dosya',crypt('1111',gen_salt('bf')),'/images/dos.jpg'),
    ('Bahodir Omonov','@baho',crypt('1111',gen_salt('bf')),'/images/baho.jpg'),
    ('Dilshod Elturayev','@dile',crypt('1111',gen_salt('bf')),'/images/dile.jpg')

;

insert into messages (
    send_userId,
    received_userId,
    send_message,
    file_type
    ) 
values
    (1,2,'nima gaplar bolar','send/text'),
    (1,2,'qachon darsga boramizmi','send/text'),
    (2,1,'yaxshi raxmat','send/text'),
    (3,2,'nima gap Bahodir','send/text'),
    (1,3,'/file/dars.jpg','image/jpg')
;
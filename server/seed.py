from models import Contacts, Users, Chats, db
from app import app
from faker import Faker
import random

fake = Faker()

with app.app_context():

    Chats.query.delete()
    Contacts.query.delete()
    Users.query.delete()
    

    profile_pics = ['https://c4.wallpaperflare.com/wallpaper/280/258/513/cat-dark-black-profile-wallpaper-thumb.jpg',
                    'https://images.pexels.com/photos/7171858/pexels-photo-7171858.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                    'https://wallpapers.com/images/hd/cool-profile-picture-1ecoo30f26bkr14o.jpg',
                    'https://wallpapers.com/images/hd/dark-profile-pictures-1920-x-1080-5hx48ognxf1fnfb1.jpg',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqlVcxJEC5p0tJnSKX0I3J4tGMtr9FceWCcg&usqp=CAU',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2iy3iZ0I55-2iiif6gxL4N_zpseW8kL0mqMhf2r4V_foWntE_sZe3EwCsJEthBvKQprc&usqp=CAU',
                    'https://media.istockphoto.com/id/1139459625/photo/silhouette-of-man-in-dark-place-anonymous-backlit-contour-a.webp?b=1&s=170667a&w=0&k=20&c=FvcYQyr8xlRzVHrYb3IsksCwDfTucVTQfOM_kq7whHI=',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Cw2xLbLzOLDE3i59TaZ847uYjDt3P3XRdQ&usqp=CAU',
                    'https://i.pinimg.com/736x/82/9f/7e/829f7eb95d66228c71d7e79f5adacdc0--gaming-logo-drawing-ideas.jpg',
                    'https://wallpapers.com/images/hd/dark-anime-pictures-fzzo5fess1cqye41.jpg',
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfigfb0-sjYbqEKuAdegBGX47ab8pYw2zZkg&usqp=CAU'
                    ]
    
    contacts_list =[]
    for i in range(20):
        probability_of_nothing = 0.2 
        random_number = random.random()
        if random_number < probability_of_nothing:
            result = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU' 
        else:
            result = random.choice(profile_pics)

        contact = Contacts(
            name = fake.name(),
            number = fake.phone_number(),
            email = fake.free_email(),
            profile_pic = result
        )
        contacts_list.append(contact)
    db.session.add_all(contacts_list)
    db.session.commit()
    print("SEEDED CONTACTS....")
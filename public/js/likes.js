document.querySelectorAll('.reactions button').forEach((el)=> {
    el.addEventListener('mouseover', (event)=> {
        const div = event.target.parentElement.firstElementChild
        div.classList.toggle('hidden')
        div.classList.toggle('flex')
    })
    el.addEventListener('click', (event)=> {
        const div = event.target.parentElement.firstElementChild
        div.classList.toggle('hidden')
        div.classList.toggle('flex')
    })
})

document.querySelectorAll('.likes').forEach((el)=> {
    el.addEventListener('mouseleave', (event)=> {
        const div = event.target.parentElement
        div.classList.add('hidden')
        div.classList.remove('flex')
    }) 
    el.addEventListener('click', (event)=> {
        const div = event.target.parentElement
        div.classList.add('hidden')
        div.classList.remove('flex')
        
        const id = event.target.closest('.post-item').id 

        fetch(`/posts/${id}/like`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=> res.json())
        .then(data => {
            const likes = event.target.parentElement.nextElementSibling
            likes.innerText = data.likes + " Likes"
        })
        .catch(error=> console.log(error))
    })
    
}) 


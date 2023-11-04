document.querySelectorAll('.post-item').forEach((el)=> {
    el.addEventListener('mouseenter', (event)=> {
        const video = event.target.closest('.post-item').querySelector('video')
        video.play()
    } )
    el.addEventListener('mouseout', (event)=> {
        const video = event.target.closest('.post-item').querySelector('video')
        video.pause()
    })
})

document.querySelectorAll('video').forEach((el)=> {
    el.addEventListener('mouseenter', (event)=> {
        const video = event.target
        video.play()
    } )
    el.addEventListener('mouseout', (event)=> {
        const video = event.target
        video.play()
    })
})

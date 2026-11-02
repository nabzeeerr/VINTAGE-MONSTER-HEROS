import './styles.css'

export default function getTemplate(monster){
    return `
        <li>${monster.content}</li>
    `
}
import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import styled from 'styled-components'
import { useOutsideClick } from '../hooks/useOutsideClick'

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`
const MenuContext = createContext()
function Menus({ children }) {
  const [openId, setOpenId] = useState('')
  const [position, setPosition] = useState(null)
  const close = () => setOpenId('')
  const open = setOpenId
  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  )
}
function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenuContext)
  function handleClick(e) {
    const rect = e.target.closest('button').getBoundingClientRect()
    console.log(rect)
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    })
    // closest() 方法是一个DOM元素的方法，它接受一个选择器字符串作为参数，并返回调用该方法的元素的最近祖先元素（包括它自身），该祖先元素匹配给定的选择器。getBoundingClientRect() 是DOM元素的一个方法，它返回一个DOMRect对象，该对象包含了元素的大小及其相对于视口（viewport）的位置信息。DOMRect对象包含top、right、bottom、left、width和height等属性，这些属性描述了元素的边界框。
    openId === '' || openId !== id ? open(id) : close()
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisHorizontal />
    </StyledToggle>
  )
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenuContext)
  const ref = useOutsideClick(close)
  if (id !== openId) return null
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  )
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenuContext)
  function handleClick() {
    onClick?.()
    close()
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  )
}
Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus

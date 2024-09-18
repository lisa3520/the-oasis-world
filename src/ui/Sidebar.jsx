import styled from 'styled-components'
import Logo from './Logo'
import MainNav from './MainNav'
import Uploader from '../data/Uploader'
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
  /* grid-row: 1/-1; 的意思是：将这个网格项放置在网格的第一行开始，并让它跨越所有行，直到网格的最后一行结束。这通常用于希望某个网格项占据整个网格垂直空间的情况。 */
  flex-direction: column;
  gap: 3.2rem;
`
export default function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  )
}

import Header2 from "./header";
import Features from "./Features";
import Benefits from "./Benefits";
import Contact from "./Contact";
import Community from "./Community";
import About from "./About";
import { Center, Image, Heading, Flex, Text, useMediaQuery } from '@chakra-ui/react';
import home_image from '../images/home_image.webp'
import './../App.css';

/*
function Home(){

  function handleSubmit(e){
    e.preventDefault();
    console.log(content);
  }
  const [content, setContent] = useState('');
  return (
    <div className='App'>
      <Box boxSize='3'/>
      <Center>
        <form onSubmit={handleSubmit}>  
          <HStack spacing='0'>
            <Input position='back' type='text' borderRadius='m' placeholder='Search' color='black' bg='white' htmlSize={40} width='auto' 
              value={content} onChange={(e) => setContent(e.target.value)}>
            </Input>
            <Button position='background' borderRadius='m' children={<SearchIcon color='gray' />} type='submit' ></Button>
          </HStack>
        </form>
      </Center>
      <Box boxSize='3'/>
      <VStack>
        <Center>
          <VStack spacing='1'>
            {JSONDATA.filter((value)=> 
            {
              if (content === "") {
                return (<Box bg='#1A202C' color='white'>{value.name}</Box>)
              } else if (value.name.toLowerCase().includes(content.toLowerCase())){
                return <Box bg='#1A202C' color='white'>{value.name}</Box>
              }
            }).map((value, key) => 
            {
              return (
                <Box bg='#1A202C' color='white'>{value.name}</Box>
              );
            })}
          </VStack>
        </Center> 
      </VStack>
    </div>
  );
}
*/

function Home(){

  const [isLarge] = useMediaQuery('(min-width: 900px)')

  return(
    <div className='App'>
      {isLarge ? 
      <Center mt='20vh' mb='0'>
        <Flex flexDir='row' justifyContent='center' alignItems='center'>
          <Flex w={[300, 400, 500, 600 ]} flexDir='column' alignItems='start'>
            <Heading color='white' fontSize={{ base: '40px', md: '56px', lg: '90px'}}>MATCH</Heading>
            <Heading color='white' fontSize={{ base: '40px', md: '56px', lg: '90px' }}>MATCHER</Heading>
            <Text color='white' mt='5%' fontSize={{ base: '16px', md: '22px', lg: '30px' }}>Match your friends to find a Match</Text>
          </Flex>
          <Image w={[300, 400, 500, 600, 700, 800 ]} src={home_image} alt='home_image'/>
        </Flex>
      </Center> 
      :
      <Center mt='20vh' mb='10vh'>
        <Flex flexDir='column' h='max' w='max' justifyContent='space-around' alignItems='center'>
          <Flex flexDir='column' alignItems='center'>
            <Heading color='white' fontSize={{ base: '44px', md: '56px', lg: '90px'}}>MATCH</Heading>
            <Heading color='white' fontSize={{ base: '44px', md: '56px', lg: '90px' }}>MATCHER</Heading>
            <Text color='white' mt='5%' fontSize={{ base: '16px', md: '32px' }}>Match your friends to find a Match</Text>
          </Flex>
          <Image mt='10vh' alignSelf='start' w={[300, 400, 500, 600, 700]} src={home_image} alt='home_image'/>
        </Flex>
      </Center>
      }
    </div>
  )
}

function App() {
  return (
    <div className="App">
        
      <header className="App-header">
        <Header2 />
      </header>
        <Home />
        <Features/>
        <Benefits/>
        <Contact />
        <Community />
        <About />
    </div>
  );
}

export default App;
import Sidebar from "./sidebar";
import Headband from "./Header";
import { Flex, Heading, HStack, VStack, Input, Button, Select, Image, Spacer } from '@chakra-ui/react';
import pp from '../images/open_gaming_logo.png'

function Settings(){
    return(
        <div className='Sidebar'>
            <Sidebar />
            <div className="pApp">
                <Flex flexDir='column'>
                    <Headband />
                    <Flex flexDir='row' mt='3%'>
                        <Flex flexDir='column' ml='3%'>
                            <Heading>User Details</Heading>
                            <Spacer/>
                            <HStack>
                                <Input placeholder="Username" borderRadius='none' bg='white' htmlSize='40' mr='30px'></Input>
                                <Button borderRadius='none' bg='orange' color='white' width='300px'>Modify</Button>
                            </HStack>
                            <Spacer/>
                            <HStack>
                                <Input placeholder="Email Address" borderRadius='none' bg='white' htmlSize='40' mr='30px'></Input>
                                <Button borderRadius='none' bg='orange' color='white' width='300px'>Modify</Button>
                            </HStack>
                            <Spacer/>
                            <HStack>
                                <Input placeholder="Phone Number" borderRadius='none' bg='white' htmlSize='40' mr='30px'></Input>
                                <Button borderRadius='none' bg='orange' color='white' width='300px'>Modify</Button>
                            </HStack>
                            <Spacer/>
                            <Button borderRadius='none' bg='red' color='white' width='458px'>Modify the password</Button>
                            <Spacer/>
                            <Select borderRadius='none' placeholder='Select option' bg='white' width='458px'>
                                <option value='option1'>Online</option>
                                <option value='option2'>Idle</option>
                                <option value='option3'>Do Not Disturb</option>
                                <option value='option3'>Invisible</option>
                            </Select>
                        </Flex>
                        <Spacer/>
                        <VStack mr='3%'>
                            <Heading>Profile Picture</Heading>
                            <Image height='180px' src={pp} alt='open_gaming_logo'/>
                            <Button borderRadius='none'>Select Image</Button>
                        </VStack>
                    </Flex>
                    <Spacer/>
                    <Flex ml='3%' mt='3%'>
                        <Heading>Notifications</Heading>
                    </Flex>
                    <Spacer/>
                    <Flex ml='3%' mt='3%'>
                        <Heading>Sound</Heading>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}

export default Settings;

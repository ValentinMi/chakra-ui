import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import Image from "next/image"
import NextLink from "next/link"
import { BsDiscord, BsGithub, BsLightningCharge } from "react-icons/bs"
import { HiDownload, HiOutlineArrowNarrowRight } from "react-icons/hi"
import { AdBanner } from "../components/chakra-pro/ad-banner"
import { ColorModeToggle } from "../components/color-mode-toggle"
import { CommunityGFX } from "../components/community-gfx"
import { Logo, LogoIcon } from "../components/logo"
import { StatsGFX } from "../components/stats-gfx"
import json from "../configs/showcase.json"
import { getStats } from "../utils/get-stats"
import { splitNumUnit } from "../utils/number-formatter"

const websites = json.data.slice(0, 8)

export default async function Page() {
  const stats = await getStats()

  return (
    <Box pos="relative">
      <AdBanner />
      {/* NavBar */}
      <Flex align="center" py="6" maxW="8xl" mx="auto">
        <Flex align="center" px="8" flex="1">
          <Flex flex="1">
            <NextLink href="/">
              <Logo />
            </NextLink>
          </Flex>
          <Flex flex="1" justify="center" align="center" gap="6">
            {["Docs", "Components", "Documents", "Resources", "Projects"].map(
              (l, i) => (
                <Link
                  data-selected={i == 0 ? "" : undefined}
                  key={i}
                  fontWeight={{ base: "medium", _selected: "semibold" }}
                >
                  {l}
                </Link>
              ),
            )}
          </Flex>
          <Flex flex="1" justify="end" align="center" gap="8">
            <Button size="sm" colorPalette="teal" fontWeight="semibold">
              Get Started
            </Button>
            <Flex gap="4" align="center">
              <IconButton
                aria-label="Open Github repo"
                variant="ghost"
                size="sm"
                cursor="pointer"
                asChild
              >
                <Link href="https://github.com/chakra-ui/chakra-ui" external>
                  <Icon asChild boxSize="6">
                    <BsGithub />
                  </Icon>
                </Link>
              </IconButton>
              <ColorModeToggle />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* Case studies */}
      <Stack px="8" pt="32" gap="16" flex="1" maxW="8xl" mx="auto">
        <Stack gap="16">
          <Stack gap="4">
            <Stack gap="2">
              <Span color="#12A594" fontWeight="semibold" fontSize="sm">
                Case Studies
              </Span>
              <Span fontWeight="bold" fontSize="4xl">
                Built with Chakra
              </Span>
            </Stack>
            <Span color="#646464" fontWeight="medium" fontSize="lg">
              Your project can look as good as these! Check them out
            </Span>
          </Stack>
          <Button
            size="lg"
            colorPalette="teal"
            rounded="4px"
            px="7"
            w="fit-content"
            asChild
          >
            <Link href="/showcase" external unstyled>
              <span>View Showcases</span>
              <Icon asChild>
                <HiOutlineArrowNarrowRight />
              </Icon>
            </Link>
          </Button>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="8" w="full">
            {websites.map(({ name, image, url }) => (
              <LinkBox
                cursor="pointer"
                pos="relative"
                key={url}
                shadow={{ base: "xs", _hover: "lg" }}
                transition="all 0.2s ease"
                rounded="lg"
                overflow="clip"
              >
                <AspectRatio ratio={16 / 9} w="full">
                  <Image
                    height={200}
                    width={300}
                    alt={name}
                    style={{ objectFit: "cover" }}
                    src={
                      image
                        ? /^(https|http)/.test(image)
                          ? image
                          : `/${image}`
                        : "/og-image.png"
                    }
                  />
                </AspectRatio>
                <LinkOverlay href={url} external>
                  <Text
                    fontWeight="semibold"
                    textAlign="start"
                    fontSize={{ base: "sm", md: "md" }}
                    pos="absolute"
                    bottom="4"
                    right="4"
                    shadow="md"
                    rounded="full"
                    display="flex"
                    gap="3"
                    alignItems="center"
                    px="2"
                    py="1.5"
                    bg="bg"
                  >
                    {name}
                    <Icon asChild boxSize="6">
                      <HiOutlineArrowNarrowRight />
                    </Icon>
                  </Text>
                </LinkOverlay>
              </LinkBox>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
      {/* Stats */}
      <Flex maxW="8xl" mx="auto" pt="32" direction="column">
        <Stack px="8" py="32" gap="16" justify="center" flex="1">
          <Stack gap="4">
            <Stack gap="2">
              <Span color="#12A594" fontWeight="semibold" fontSize="sm">
                Stats
              </Span>
              <Span fontWeight="bold" fontSize="4xl">
                Chakra is growing quickly
              </Span>
            </Stack>
            <Span color="#646464" fontWeight="medium" fontSize="lg">
              We're dedicated to improving the experience and performance of
              Chakra UI.
            </Span>
          </Stack>
          <Flex gap="32">
            {[
              {
                description: "Downloads per month",
                icon: HiDownload,
                count: stats.npmDownloads,
              },
              {
                description: "Github Stars",
                icon: BsGithub,
                count: stats.githubStars,
              },
              {
                description: "Core contributors",
                icon: BsLightningCharge,
                count: stats.members.length.toString(),
              },
              {
                description: "Discord members",
                icon: BsDiscord,
                count: stats.discordMembers,
              },
            ].map((stat) => {
              console.log(stat.count)

              const count = splitNumUnit(stat.count)
              return (
                <Stack gap="1" key={stat.description}>
                  <Flex fontSize="7xl" align="center" fontWeight="bold">
                    {count?.[0]}
                    <Span textTransform="uppercase" fontSize="6xl">
                      {count?.[1]}
                    </Span>
                  </Flex>
                  <Flex gap="2" align="center">
                    <Icon asChild boxSize="6">
                      <stat.icon />
                    </Icon>
                    <Span fontWeight="medium" color="#646464">
                      {stat.description}
                    </Span>
                  </Flex>
                </Stack>
              )
            })}
          </Flex>
          <Stack gap="8">
            <Span fontWeight="bold" fontSize="xl">
              Our Heroes
            </Span>
            <Avatar.Group size="xl">
              {stats.members.map((mem: any, i: number) => (
                <Avatar.Root key={i}>
                  <Avatar.Image src={mem.avatar_url} />
                  <Avatar.Fallback name={mem.name} />
                </Avatar.Root>
              ))}
            </Avatar.Group>
          </Stack>
        </Stack>
        <StatsGFX />
      </Flex>
      {/* Pro */}
      <Stack px="8" pt="24" pb="16" gap="16" flex="1" maxW="8xl" mx="auto">
        <Stack gap="16" align="center" textAlign="center">
          <Stack gap="4">
            <Stack gap="2">
              <Span color="#12A594" fontWeight="semibold" fontSize="sm">
                Premium
              </Span>
              <Span fontWeight="bold" fontSize="4xl">
                Go faster. Go Pro.
              </Span>
            </Stack>
            <Span color="#646464" fontWeight="medium" fontSize="lg">
              Beautiful and responsive React components to build your
              application or marketing pages quicker.
            </Span>
          </Stack>
          <Button
            size="lg"
            colorPalette="teal"
            rounded="4px"
            px="7"
            w="fit-content"
            asChild
          >
            <Link href="https://discord.com/invite/chakra-ui" external unstyled>
              <span>Learn more</span>
              <Icon asChild>
                <HiOutlineArrowNarrowRight />
              </Icon>
            </Link>
          </Button>
          <Image
            src="/chakra-ui-ad.png"
            alt="Chakra UI Pro Image"
            layout="responsive"
            width="1200"
            height="320"
          />
        </Stack>
      </Stack>
      {/* Praise */}
      <Stack px="8" gap="16" flex="1" maxW="8xl" mx="auto" py="24">
        <Stack gap="16" align="center" textAlign="center">
          <Stack gap="4">
            <Stack gap="2">
              <Span color="#12A594" fontWeight="semibold" fontSize="sm">
                Praise
              </Span>
              <Span fontWeight="bold" fontSize="4xl">
                Loved by product people like you
              </Span>
            </Stack>
            <Span color="#646464" fontWeight="medium" fontSize="lg">
              The proof is in the praise.
            </Span>
          </Stack>
          <Grid
            gap="2"
            h="680px"
            w="full"
            templateColumns="repeat(3, 1fr)"
            templateRows="repeat(4, 1fr)"
          >
            {/* Masonry grid */}
            {Array.from({ length: 9 }).map((_, i) => {
              const rows = {
                0: 3,
                1: 2,
                2: 2,
                3: 1,
                4: 2,
                5: 1,
                6: 2,
                7: 1,
              } as any
              return (
                <GridItem key={i} rowSpan={rows[i]} border="solid 1px green">
                  <div>{i}</div>
                  <div>{i}</div>
                  <div>{i}</div>
                  <div>{i}</div>
                  <div>{i}</div>
                </GridItem>
              )
            })}
          </Grid>
        </Stack>
      </Stack>

      {/* Community */}
      <Flex align="center" maxW="8xl" mx="auto" justify="space-between">
        <Stack px="8" gap="16">
          <Stack gap="4">
            <Stack gap="2">
              <Span color="#12A594" fontWeight="semibold" fontSize="sm">
                Connect
              </Span>
              <Span fontWeight="bold" fontSize="4xl">
                Meet the people
              </Span>
            </Stack>
            <Span color="#646464" fontWeight="medium" fontSize="lg">
              Feel free to ask questions, report issues, and meet new people.
            </Span>
          </Stack>
          <Button
            size="lg"
            colorPalette="teal"
            rounded="4px"
            px="7"
            w="fit-content"
            asChild
          >
            <Link href="https://discord.com/invite/chakra-ui" external unstyled>
              Join the discord
            </Link>
          </Button>
        </Stack>
        <Flex>
          <CommunityGFX />
        </Flex>
      </Flex>
      {/* Footer */}
      <Flex align="center" px="8" gap="8" flex="1" py="6" maxW="8xl" mx="auto">
        <Flex w="20" justify="center">
          <NextLink href="/">
            <LogoIcon />
          </NextLink>
        </Flex>
        <Flex align="center" gap="6">
          {["Product", "Company", "Resources"].map((l, i) => (
            <Link key={i} fontWeight="semibold">
              {l}
            </Link>
          ))}
        </Flex>
        <Flex flex="1" justify="end" align="center" gap="8">
          {["Terms", "Privacy", "Cookies", "Contact"].map((l, i) => (
            <Link key={i} fontWeight="semibold">
              {l}
            </Link>
          ))}
          <Span color="#838383">© 2024 Chakra UI. All rights reserved.</Span>
        </Flex>
      </Flex>
    </Box>
  )
}

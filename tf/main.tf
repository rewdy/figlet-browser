terraform {
  required_version = "1.9.8"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket = "drewmey--devops-tf-state"
    key    = "figlet-browser.rewdy.lol/terraform.state"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

module "aws_static_website" {
  source = "github.com/rewdy/tf-aws-static-me"

  # Route53 hosted zone to use, should already exist
  domain_hosted_zone = "rewdy.lol"

  # Domain name you want to use; can be the domain root or a sub domain
  domain_name = "figlet-browser.rewdy.lol"
  support_spa = true

  tags = {
    Project = "figlet browser"
  }
}